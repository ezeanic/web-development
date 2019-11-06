import {QuestionMOCK_DATA, VotePassMOCK_DATA, VoteFailMOCK_DATA, PostQuestionMOCK_DATA} from '../Mockdata'
import {FetchQuestions, PostQuestions, FetchVoting, UpVote, DownVote, NotUpVote, NotDownVote} from '../API_Interface'
import {QuestionEntry, VoteValidation} from '../QuestionEntry'
import {FetchMock} from 'jest-fetch-mock'
import fetch from 'jest-fetch-mock'
/* jest-fetch-mock is documented here: https://www.npmjs.com/package/jest-fetch-mock */
let rootUrl = process.env.API_URL || ''

let fetchM = fetch as FetchMock

let _id = "qwerty"
let question = "this is a new question"

describe("testing fetchers in network happy paths", ()  => {
    
    beforeEach(() => {
        fetchM.resetMocks()
      })
     
    it('fetches questions without crashing', () => {
        fetchM.mockResponseOnce(JSON.stringify(QuestionMOCK_DATA))
        FetchQuestions(rootUrl+"/question", (theList: QuestionEntry[]) => {
            expect(theList).toEqual(QuestionMOCK_DATA)
        })
    })

    it('tests FetchQuestions catch error', () => {
        fetchM.mockReject(new Error('not an error, testing if it catches error'))
        FetchQuestions(rootUrl+"/question",(theList: QuestionEntry[]) => {
            expect(theList.length).toEqual(0)
        })
    })

    it('post questions without crashing', () => {
        fetchM.mockResponseOnce(JSON.stringify(PostQuestionMOCK_DATA))
        PostQuestions(rootUrl+"/question", question, (theQuestion: QuestionEntry) => {
            expect(theQuestion).toEqual(PostQuestionMOCK_DATA)
        })
    })

    it('test upVote', () => {
        fetchM.mockResponseOnce(JSON.stringify(VotePassMOCK_DATA))
        FetchVoting("", (authentication: VoteValidation) => {
            expect(authentication.err).toEqual(false)
        })
    })

    it('test downVote', () => {
        fetchM.mockResponseOnce(JSON.stringify(VoteFailMOCK_DATA))
        FetchVoting("", (authentication: VoteValidation) => {
            expect(authentication.err).toEqual(true)
        })
    })
    
    it('calls upVote and returns data to me', () => {
        fetchM.mockResponseOnce(JSON.stringify(VotePassMOCK_DATA))
        UpVote(rootUrl,_id,(authentication: VoteValidation) => {
            expect(authentication.err).toEqual(false)
        })
        //assert on the times called and arguments given to fetch
        expect(fetchM.mock.calls.length).toEqual(1)
        expect(fetchM.mock.calls[0][0]).toEqual(rootUrl+'/vote/upVote/'+_id)
    })

    it('calls downVote and returns data to me', () => {
        fetchM.mockResponseOnce(JSON.stringify(VotePassMOCK_DATA))
        DownVote(rootUrl,_id,(authentication: VoteValidation) => {
            expect(authentication.err).toEqual(false)
        })
        //assert on the times called and arguments given to fetch
        expect(fetchM.mock.calls.length).toEqual(1)
        expect(fetchM.mock.calls[0][0]).toEqual(rootUrl+'/vote/downVote/'+_id)
    })

    it('calls notUpVote and returns data to me', () => {
        fetchM.mockResponseOnce(JSON.stringify(VoteFailMOCK_DATA))
        NotUpVote(rootUrl,_id,(authentication: VoteValidation) => {
            expect(authentication.err).toEqual(true)
        })
        //assert on the times called and arguments given to fetch
        expect(fetchM.mock.calls.length).toEqual(1)
        expect(fetchM.mock.calls[0][0]).toEqual(rootUrl+'/vote/notUpVote/'+_id)
    })

    it('calls notDownVote and returns data to me', () => {
        fetchM.mockResponseOnce(JSON.stringify(VoteFailMOCK_DATA))
        NotDownVote(rootUrl,_id,(authentication: VoteValidation) => {
            expect(authentication.err).toEqual(true)
        })
        //assert on the times called and arguments given to fetch
        expect(fetchM.mock.calls.length).toEqual(1)
        expect(fetchM.mock.calls[0][0]).toEqual(rootUrl+'/vote/notDownVote/'+_id)
    })

    it('tests Fetchvoting catch error', () => {
        fetchM.mockReject(new Error('Error: cannot validate.'))
        NotDownVote(rootUrl,_id,(authentication: VoteValidation) => {
        expect(authentication.err).toEqual(true)
        expect(authentication.msg).toEqual("Error: cannot validate.")
        })
    })
})
