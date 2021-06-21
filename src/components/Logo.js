import * as React from "react"
import { useHistory } from "react-router"

function SvgComponent({classNames, fill, width}) {
  const history = useHistory()
  const getColor = () => {
    switch(fill){
      case 'primary':
        return '#ED6D5C'
      case 'dark': 
        return '#180C14'
      case 'white':
        return '#ffffff'
      case 'black':
        return '#000000'
      case 'mid':
        return '#594373'
    }
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 479.57 454.11"
      className={classNames}
      width={width + 'rem'}
      style={{cursor: 'pointer'}}
      onClick={()=>history.push('/')}
    >
      <defs>
        <style>{`.prefix__cls-1{fill:#000}`}</style>
      </defs>
      <title>{"Recurso 1"}</title>
      <g id="prefix__Capa_2" data-name="Capa 2">
        <g id="prefix__Capa_1-2" data-name="Capa 1">
          <path
            style={{fill: getColor()}}
            className="prefix__cls-1"
            d="M2.26 138V0h66.23q23.79 0 34.93 12.54t11.15 33.76q0 13.94-7.18 24T87.13 84.87a25.06 25.06 0 015.47 6 54.12 54.12 0 014.18 8.57L113.49 138h-30L67.2 101q-2.15-4.71-4.71-6.65t-8.58-1.92H31.19V138zm28.93-69.63H61q11.37 0 17.79-5t6.43-17q0-11.58-5.57-16.94T62.7 24H31.19zM125.3 138L178 0h31.71l52.51 138h-30l-13.07-33.22h-50.8L155.52 138zm47.37-55.51h42.22L193.67 27zM291.28 138V22.29h-42.44V0h113.59v22.29h-42.22V138zM380.55 138V0h99v22.5h-70.07v35.37h70.09v22.29h-70.09v35.58h70.09V138zM44 288.18V242.9L0 165.66h26.83L56.88 221l30.06-55.36h26.63L69.63 242.9v45.28zM173.28 290.08q-59.53 0-59.54-62.59 0-33.68 15-48.7t44.51-15q29.49 0 44.52 15t15 48.7q.06 62.6-59.49 62.59zm0-21.88q17.31 0 25.4-10t8.09-30.72q0-23-8.09-32.44t-25.4-9.41q-17.31 0-25.39 9.41t-8.09 32.44q0 20.73 8.09 30.72t25.39 10zM304.55 290.08q-25.31 0-40.05-12.27t-14.74-35.67v-76.48h25.68v74.58q0 14.07 7.61 21t21.5 6.94q13.89 0 21.4-6.94t7.52-21v-74.58h25.68v76.48q0 23.4-14.65 35.67t-39.95 12.27zM379.88 288.18V165.66h58.79q21.12 0 31 11.13t9.89 30q0 12.38-6.37 21.31t-18 12.93a22.46 22.46 0 014.85 5.33 48 48 0 013.71 7.61l14.84 34.25H452l-14.45-32.92a15.08 15.08 0 00-4.19-5.89q-2.28-1.73-7.61-1.72h-20.18v40.53zm25.69-61.83H432q10.08 0 15.79-4.47t5.71-15.13q0-10.27-4.95-15t-15-4.75h-28zM2.26 454.11V318.63h63.53q16 0 26.19 6.11a38.33 38.33 0 0115.25 16.61 54.73 54.73 0 015 24 49.36 49.36 0 01-5.79 24.2 40.41 40.41 0 01-16.4 16.3q-10.58 5.77-25.04 5.77H30.66v42.49zm28.4-65h28.4q12.19 0 18.4-6.42t6.21-17.36q0-11.77-5.89-18t-17.67-6.21H30.66zM128.05 454.11V318.63h28.4v113.6h66.69v21.88zM402.58 454.11V404L354 318.63h29.66l33.24 61.22 33.24-61.22h29.45L431 404v50.07zM299.45 318.63l22 44.6 49.22 7.15-35.61 34.71 8.4 49.02-44.01-23.14-44.02 23.14 8.4-49.02-35.61-34.71 49.22-7.15 22.01-44.6z"
          />
        </g>
      </g>
    </svg>
  )
}

export default SvgComponent