export type FollowCompanyItem = {
  id: string;
  following: {
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
