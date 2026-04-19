export type FollowCompanyItem = {
    id: string;
    candideId: string; // ⚠️ typo in backend? maybe "candidateId"
    companyId: string;
    createdAt: string;
    updatedAt: string;
    company: {
        id: string;
        user: {
            id: string;
            name: string;
        };
        location: string;
        logo: string;
        industry: string;
        _count: {
            applications: number;
        };
    };
};