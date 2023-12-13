import { FC } from 'react'

const Head: FC = () => {
  return (
    <head>
      <meta charSet="utf-8" />
      <link rel="icon" href="favicon.ico" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <link rel="apple-touch-icon" href="logo192.png" />
      <script src="js/client.js" defer />

      {process.env.NODE_ENV === 'production' ? (
        <link rel="stylesheet" href="css/bundle.css" />
      ) : undefined}
      {process.env.NODE_ENV === 'development' ? (
        <script src={process.env.BROWSER_REFRESH_URL} />
      ) : undefined}
      <title>React App</title>
    </head>
  )
}

export default Head
