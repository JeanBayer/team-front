export interface VoteSprintWinner {
  userId: string;
}

export interface VoteStatus {
  myVote: MyVote | null;
  totalVotes: number;
  totalMembers: number;
  statusRetrospective: string;
}

export interface MyVote {
  id: string;
  voterId: string;
  retrospectiveId: string;
  votedForId: string;
  createdAt: Date;
}
