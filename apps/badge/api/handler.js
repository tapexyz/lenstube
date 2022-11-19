import fetch from 'node-fetch'

const PROFILE_QUERY = `
 query Profile($request: SingleProfileQueryRequest!) {
  profile(request: $request) {
    stats {
      totalFollowers
    }
  }
}
`

export default async function handler(request, response) {
  const { handle } = request.query
  console.log('🚀 ~ file: handler.js ~ line 5 ~ handler ~ handle', handle)

  const res = await fetch('https://api.lens.dev', {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'Profile',
      query: PROFILE_QUERY,
      variables: {
        request: { handle }
      }
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  const { data } = await res.json()
  console.log('🚀 ~ file: handler.js ~ line 29 ~ handler ~ data', data)

  return response.end(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="93.9" height="20" viewBox="0 0 939 200" role="img" aria-label="Lens: 100">
  <title>Lens: 100</title>
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="m"><rect width="939" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#m)">
    <rect width="769" height="200" fill="#555"/>
    <rect width="170" height="200" fill="#307AE8" x="769"/>
    <rect width="939" height="200" fill="url(#a)"/>
  </g>
  <g aria-hidden="true" fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="220" y="148" textLength="509" fill="#000" opacity="0.25">GitPOAPs</text>
    <text x="210" y="138" textLength="509">GitPOAPs</text>
    <text x="824" y="148" textLength="70" fill="#000" opacity="0.25">3</text>
    <text x="814" y="138" textLength="70">3</text>
  </g>
  <image x="40" y="35" width="130" height="130" xlink:href="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzODEuNTUgMzczLjU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzODEuNTUgMzczLjU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6bm9uZTtzdHJva2U6IzIzMUYyMDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQoJLnN0MXtmaWxsOiMwMDUwMUU7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTg5LjIzLDIyOS40NmMtMi45NCwwLTcyLjcyLTAuNjEtMTI2LjA4LTUzLjk4Yy0xLjEzLTEuMTMtMi4yMy0yLjI2LTMuMzEtMy40MQoJYy0xMS4xNy0xMS44LTE2LjQ4LTI1LjgyLTE1LjM1LTQwLjU1YzAuOTktMTIuOTksNi45Ny0yNS41OSwxNi44NS0zNS40N2M5Ljg4LTkuODgsMjIuNDctMTUuODYsMzUuNDctMTYuODUKCWMxMy42MS0xLjA0LDI2LjYyLDMuNDIsMzcuODMsMTIuOTJjMS4yMS0xNC42NCw3LjI2LTI2Ljk5LDE3LjYxLTM1Ljg4YzkuODktOC40OSwyMy4wMy0xMy4xNiwzNi45OS0xMy4xNnMyNy4xMSw0LjY3LDM2Ljk5LDEzLjE2CgljMTAuMzYsOC44OSwxNi40LDIxLjI0LDE3LjYyLDM1Ljg4YzExLjIxLTkuNSwyNC4yMi0xMy45NiwzNy44My0xMi45MmMxMi45OSwwLjk5LDI1LjU5LDYuOTcsMzUuNDYsMTYuODUKCWM5Ljg4LDkuODgsMTUuODYsMjIuNDcsMTYuODUsMzUuNDdjMS4xMiwxNC43My00LjE5LDI4Ljc1LTE1LjM1LDQwLjU1Yy0xLjA4LDEuMTQtMi4xOSwyLjI4LTMuMzEsMy40MQoJQzI2MS45NSwyMjguODUsMTkyLjE4LDIyOS40NiwxODkuMjMsMjI5LjQ2eiBNMTAwLjY1LDkwLjE1Yy0xMi4xLDAtMjMuNDYsNS42Mi0zMS41NCwxMy43Yy0xNC41MywxNC41My0yMS4xMiwzOS43MS0xLjI4LDYwLjY4CgljMS4wMSwxLjA3LDIuMDQsMi4xMywzLjEsMy4xOWM1MC4xOCw1MC4xOCwxMTcuNjMsNTAuNzYsMTE4LjMxLDUwLjc2YzAuNjcsMCw2OC4yNS0wLjcxLDExOC4zMS01MC43NmMxLjA2LTEuMDYsMi4wOS0yLjEyLDMuMS0zLjE5CgljMTkuODQtMjAuOTYsMTMuMjQtNDYuMTUtMS4yOS02MC42N2MtMTQuNTMtMTQuNTMtMzkuNzEtMjEuMTItNjAuNjctMS4yOWMtMS4wNywxLjAxLTIuMTMsMi4wNC0zLjE5LDMuMQoJYy0wLjgyLDAuODItMS42LDEuNjUtMi4zOCwyLjQ4bC0xMC40OCwxMS4wNWwwLjQxLTE1LjE4YzAuMDMtMS4xNSwwLjA3LTIuMzEsMC4wNy0zLjQ4YzAtMS40OS0wLjAyLTIuOTctMC4wNi00LjQ1CgljLTAuOC0yOC44NS0yMy4yNy00Mi00My44MS00MnMtNDMuMDIsMTMuMTQtNDMuODEsNDJjLTAuMDQsMS40Ny0wLjA2LDIuOTUtMC4wNiw0LjQ1YzAsMS4xNCwwLjAzLDIuMjcsMC4wNiwzLjM5bDAuNCwxNS4yNwoJbC0xMC40NC0xMS4wMmMtMC43OS0wLjg0LTEuNTktMS42OC0yLjQxLTIuNTFjLTEuMDYtMS4wNi0yLjEyLTIuMDktMy4xOS0zLjFDMTIwLjQ3LDkzLjc0LDExMC4zMiw5MC4xNSwxMDAuNjUsOTAuMTV6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMzIuMTUsMzEwLjQ0Yy0xOS42Nyw5LjA0LTQyLjE0LDExLjQtNjMuNCw2LjYyYy0yMC42Mi00LjY0LTM4LjctMTUuMzgtNTIuNTktMzEuMTUKCWMxLjM2LDAuOTQsMi43NiwxLjg1LDQuMiwyLjcyYzExLjg4LDcuMTYsMjUuMDgsMTAuNzYsMzguMjgsMTAuNzZjMTEuNzMsMCwyMy40Ny0yLjg0LDM0LjI5LTguNTZjMC43Ny0wLjQsMS41My0wLjgyLDIuMjktMS4yNQoJbC01LjQ0LTkuNTZjLTAuNjYsMC4zOC0xLjMyLDAuNzQtMS45OSwxLjA5Yy0xOS41NSwxMC4zMy00Mi42Myw5LjYzLTYxLjc1LTEuODljLTE5LjU3LTExLjc5LTMxLjI2LTMyLjQyLTMxLjI2LTU1LjE4di00LjI0aC0wLjEKCWgtMTAuOWgtMC4xdjQuMjRjMCwyMi43Ni0xMS42OSw0My4zOS0zMS4yNiw1NS4xOGMtMTkuMTIsMTEuNTItNDIuMiwxMi4yMy02MS43NSwxLjg5Yy0wLjY3LTAuMzUtMS4zMy0wLjcxLTEuOTktMS4wOWwtNS40NCw5LjU2CgljMC43NiwwLjQzLDEuNTIsMC44NSwyLjI5LDEuMjVjMTAuODIsNS43MiwyMi41NSw4LjU2LDM0LjI5LDguNTZjMTMuMiwwLDI2LjM5LTMuNiwzOC4yOC0xMC43NmMxLjQ0LTAuODYsMi44NC0xLjc3LDQuMi0yLjcyCgljLTEzLjg5LDE1Ljc3LTMxLjk3LDI2LjUxLTUyLjU5LDMxLjE1Yy0yMS4yNiw0Ljc5LTQzLjczLDIuNDMtNjMuNC02LjYybC01LjUzLDkuNThjMTQuNyw2LjkyLDMwLjg0LDEwLjQ2LDQ3LjA1LDEwLjQ2CgljOC4xNCwwLDE2LjI5LTAuODksMjQuMjktMi42OWMyNC42Ni01LjU1LDQ2LjA3LTE4Ljk1LDYxLjg5LTM4LjczYzMuNy00LjYyLDYuOTItOS41OCw5LjY2LTE0Ljc3djU2LjE5aDExdi01Ni4zOAoJYzIuNzcsNS4yNiw2LjAyLDEwLjI5LDkuNzYsMTQuOTZjMTUuODMsMTkuNzgsMzcuMjMsMzMuMTcsNjEuODksMzguNzNjOCwxLjgsMTYuMTUsMi42OSwyNC4yOSwyLjY5YzE2LjIxLDAsMzIuMzUtMy41NCw0Ny4wNS0xMC40NgoJTDMzMi4xNSwzMTAuNDR6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xODIuMDgsMTcxLjJoLThjMC0xMS45MS0xMS41OS0yMS42MS0yNS44NC0yMS42MWMtMTQuMjUsMC0yNS44NCw5LjY5LTI1Ljg0LDIxLjYxaC04CgljMC0xNi4zMiwxNS4xOC0yOS42MSwzMy44NC0yOS42MUMxNjYuOSwxNDEuNTksMTgyLjA4LDE1NC44NywxODIuMDgsMTcxLjJ6Ii8+CjxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjE1Ny40NCIgY3k9IjE1OS44NiIgcj0iMTEuNTEiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTI2NC4xNCwxNzEuMmgtOGMwLTExLjkxLTExLjU5LTIxLjYxLTI1Ljg0LTIxLjYxYy0xNC4yNSwwLTI1Ljg0LDkuNjktMjUuODQsMjEuNjFoLTgKCWMwLTE2LjMyLDE1LjE4LTI5LjYxLDMzLjg0LTI5LjYxQzI0OC45NiwxNDEuNTksMjY0LjE0LDE1NC44NywyNjQuMTQsMTcxLjJ6Ii8+CjxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjIzOS41MSIgY3k9IjE1OS44NiIgcj0iMTEuNTEiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4OS4xLDIwMC42MWMtOS40MywwLTE4LjE3LTQuODUtMjIuMjUtMTIuMzRsNy4wMy0zLjgzYzIuNzEsNC45Niw4LjY4LDguMTcsMTUuMjMsOC4xNwoJYzYuNTUsMCwxMi41My0zLjIxLDE1LjIzLTguMTdsNy4wMywzLjgzQzIwNy4yNywxOTUuNzYsMTk4LjUzLDIwMC42MSwxODkuMSwyMDAuNjF6Ii8+Cjwvc3ZnPgo="/>
</svg>`)
}
