import { API_URL, APP_PUBLIC_URL } from "../modules/auth/core/_requests"

export function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData()
          loader.file.then((file: any) => {
            body.append('image', file)
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            fetch(`${API_URL}/upload-image`, {
              method: 'post',
              body: body,
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${APP_PUBLIC_URL}${res.url}`,
                })
              })
              .catch((err) => {
                reject(err)
              })
          })
        })
      },
    }
  }