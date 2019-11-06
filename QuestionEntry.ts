export type QuestionEntry = {
    question: string,
    postDate: Date,
    numUpVotes: number,
    canUpVote: boolean;
    numDownVotes: number,
    canDownVote: boolean,
    flagCount: number,
    isArchived?:boolean
    _id: string,
}

export type VoteValidation = {
    err: boolean,
    msg: string
}

