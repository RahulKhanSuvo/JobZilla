export type FollowCompanyItem = {
  id: string;
  following: {
    id: string;
    name: string;
    _count: {
      jobs: number;
    };
    company: {
      id: string;
      location: string;
      logo: string;
      industry: string;
    };
  };
};
