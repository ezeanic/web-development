import {QuestionEntry, VoteValidation} from './QuestionEntry'
import { callbackify } from 'util';

function FetchQuestions(root_url: string, responseHandler: (theList:QuestionEntry[]) => void) {
    fetch(root_url + "/stats")
    .then( (response) => {
            return response.json(); }
            )
    .then( (json) => {
        let theList: QuestionEntry[] = []
        for (let item of json) {
            theList.push({
                question:item.question,
                postDate:new Date(item.postDate),
                numUpVotes:item.numUpVotes,
                canUpVote:item.canUpVote,
                numDownVotes:item.numDownVotes,
                canDownVote:item.canDownVote,
                flagCount:item.flagCount,
                _id:item._id,
                isArchived:item.isArchived
            })
        }
        responseHandler(theList)
    })
    .catch( (err) => {
        responseHandler([])
        console.log(err.message)
    })
}

function PostQuestions(root_url: string, question: string, responseHandler: (theQuestion:QuestionEntry) => void){
    fetch(root_url + "/question", {method:'POST', body:JSON.stringify({question: question}), headers: { 'Content-Type': 'application/json' }})
    .then( (response) => {
        return response.json(); }
        )
    .then( (json) => {
        let theQuestion: QuestionEntry = {
                question:json.question,
                postDate:new Date(json.postDate),
                numUpVotes: 0,
                canUpVote: true,
                numDownVotes: 0, 
                canDownVote: true,
                flagCount: 0,
                _id:json._id
        }
        responseHandler(theQuestion)
    })
    .catch( (err) => {
        responseHandler({question: err.message} as QuestionEntry)
        console.log(err.message)
    })
} 

function FetchVoting(root_url: string, responseHandler: (authentication:VoteValidation) => void) {
    fetch(root_url)
    .then( (response) => {
            return response.json(); }
            )
    .then( (json) => {
        responseHandler(json)
    })
    .catch( (err) => {
        responseHandler({err: true, msg: err.message})
    })
}

function Voting(root_url: string,_id: string, vote: string, responseHandler: (authentication:VoteValidation) => void){
    //create url and send to fetch voting
    FetchVoting(root_url + "/vote/" + vote + "/" + _id ,responseHandler)
}

function UpVote(root_url: string,_id: string, responseHandler: (authentication:VoteValidation) => void){
    return Voting(root_url ,_id, "upVote", responseHandler)
}

function DownVote(root_url: string,_id: string, responseHandler: (authentication:VoteValidation) => void){
    return Voting(root_url,_id, "downVote",responseHandler)
}
function NotUpVote(root_url: string,_id: string, responseHandler: (authentication:VoteValidation) => void){
    return Voting(root_url,_id, "notUpVote", responseHandler)
}

function NotDownVote(root_url: string,_id: string, responseHandler: (authentication:VoteValidation) => void){
    return Voting(root_url,_id, "notDownVote", responseHandler)
}
function ArchiveQuestion(root_url:string,_id:string,responseHandler:(q?:QuestionEntry)=>void){
    fetch(root_url+'/question/'+_id+'/archive')
    .then( (response) => {
        return response.json(); }
        )
    .then( (item) => {
        
        responseHandler({
                question:item.question,
                postDate:new Date(item.postDate),
                numUpVotes:item.numUpVotes,
                canUpVote:item.canUpVote,
                numDownVotes:item.numDownVotes,
                canDownVote:item.canDownVote,
                flagCount:item.flagCount,
                _id:item._id,
                isArchived:item.isArchived
            })
        
        
    })
    .catch( (err) => {
        responseHandler()
        console.log(err.message)
    })
}
function UnarchiveQuestion(root_url:string,_id:string,responseHandler:(q?:QuestionEntry)=>void){
    fetch(root_url+'/question/'+_id+'/unarchive')
    .then( (response) => {
        return response.json(); }
        )
    .then( (item) => {
        
        responseHandler({
                question:item.question,
                postDate:new Date(item.postDate),
                numUpVotes:item.numUpVotes,
                canUpVote:item.canUpVote,
                numDownVotes:item.numDownVotes,
                canDownVote:item.canDownVote,
                flagCount:item.flagCount,
                _id:item._id,
                isArchived:item.isArchived
            })
        
    })
    .catch( (err) => {
        responseHandler()
        console.log(err.message)
    })
    
}
function MergeQuestions(root_url:string,_ids:string[]){
    fetch(root_url+'/questions/merge',{method:'POST',body:JSON.stringify(_ids),headers: { 'Content-Type': 'application/json' }})
}
export {FetchQuestions, FetchVoting, UpVote, DownVote, NotUpVote, NotDownVote, PostQuestions}
export {ArchiveQuestion, UnarchiveQuestion, MergeQuestions}
