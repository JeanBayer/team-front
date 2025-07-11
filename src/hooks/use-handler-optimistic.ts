import { useQueryClient } from "@tanstack/react-query";

type UseHandlerOptimisticProps<T, E> = {
  queryKey: string[];
  onMutate: (mutateData: E) => (old: T) => T;
  onError?: (error?: Error) => void;
  onSettled?: () => void;
  onSuccess?: () => void;
};
export const useHandlerOptimistic = <T, E>({
  queryKey,
  onMutate,
  onError = () => {},
  onSettled = () => {},
  onSuccess = () => {},
}: UseHandlerOptimisticProps<T, E>) => {
  const queryClient = useQueryClient();

  async function handleOnMutate(mutateData: E) {
    await queryClient.cancelQueries({ queryKey });
    const previousData = queryClient.getQueryData<T>(queryKey);

    if (!previousData) return { previousData };

    queryClient.setQueryData(queryKey, onMutate(mutateData));

    return { previousData };
  }

  function handleOnError(
    _err: Error,
    _variables: void | E,
    context:
      | {
          previousData: T | undefined;
        }
      | undefined
  ) {
    queryClient.setQueryData(queryKey, context?.previousData);
    onError(_err);
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
