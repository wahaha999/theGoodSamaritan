import { IPostDialog } from "../pages/dashboard/store/postDialogSlice"

type IPostTitle ={
    [K in IPostDialog['postType']]:string
}
export const POST_DIALOG_TITLE:IPostTitle = {
    "new_post": "New Post",
    "edit_post" : "Edit Post",
    "new_comment": "New Comment",
    "edit_comment": "Edit Comment",
    "new_reply": "New Reply",
    "edit_reply":"Edit Reply"

}