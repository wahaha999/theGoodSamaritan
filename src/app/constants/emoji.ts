import {toAbsoluteUrl} from 'src/_metronic/helpers'
export interface IEmoji {
  id: number
  url: string
}
export const emoji: IEmoji[] = [
  {id: 1, url: toAbsoluteUrl('/assets/images/emoji/blushing_face.png')},
  {id: 2, url: toAbsoluteUrl('/assets/images/emoji/cool_face.png')},
  {id: 3, url: toAbsoluteUrl('/assets/images/emoji/crying_face.png')},
  {id: 4, url: toAbsoluteUrl('/assets/images/emoji/emoji_face.png')},
  {id: 5, url: toAbsoluteUrl('/assets/images/emoji/heart.png')},
  {id: 6, url: toAbsoluteUrl('/assets/images/emoji/terrible.png')},
  {id: 7, url: toAbsoluteUrl('/assets/images/emoji/heart_emoji_face.png')},
]
