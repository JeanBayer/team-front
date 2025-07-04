import { useQueryClient } from "@tanstack/react-query";

type UseHandlerOptimisticProps<T> = {
  queryKey: string[];
  onMutate: (old: T) => T;
  onError?: () => void;
  onSettled?: () => void;
  onSuccess?: () => void;
};
export const useHandlerOptimistic = <T>({
  queryKey,
  onMutate,
  onError = () => {},
  onSettled = () => {},
  onSuccess = () => {},
}: UseHandlerOptimisticProps<T>) => {
  const queryClient = useQueryClient();

  async function handleOnMutate() {
    await queryClient.cancelQueries({ queryKey });
    const previousData = queryClient.getQueryData<T>(queryKey);

    if (!previousData) return { previousData };

    queryClient.setQueryData(queryKey, onMutate);

    return { previousData };
  }

  function handleOnError(
    _err: Error,
    _variables: void,
    context:
      | {
          previousData: T | undefined;
        }
      | undefined
  ) {
    queryClient.setQueryData(queryKey, context?.previousData);
    onError();
  }

  function handleOnSettled() {
    queryClient.invalidateQueries({ queryKey });
    onSettled();
  }

  function handleOnSuccess() {
    queryClient.invalidateQueries({
      queryKey,
    });
    onSuccess();
  }

  return {
    onMutate: handleOnMutate,
    onError: handleOnError,
    onSettled: handleOnSettled,
    onSuccess: handleOnSuccess,
  };
};
