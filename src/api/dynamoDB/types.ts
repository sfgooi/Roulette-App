export type Member = {
  departmentId: number;
  departmentName: string;
  memberId: number;
  memberName: string;
  size: number;
  createdAt: string;
  updatedAt: string;
};

export type DynamoDBOperations = {
  getAllMembers: () => Promise<Member[]>;
  createMember: (
    member: Omit<Member, "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateMember: (member: Member) => Promise<void>;
  deleteMember: (memberId: number) => Promise<void>;
};
