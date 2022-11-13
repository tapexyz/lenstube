import React from 'react'
import { SVGProps } from 'react'

const SwitchChannelOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.948 0.250001H10.052C10.9505 0.249972 11.6997 0.249947 12.2945 0.329913C12.9223 0.414318 13.4891 0.599989 13.9445 1.05546C14.4 1.51093 14.5857 2.07773 14.6701 2.70552C14.7501 3.30031 14.75 4.04953 14.75 4.94801V5.052C14.75 5.95048 14.7501 6.6997 14.6701 7.29448C14.5857 7.92228 14.4 8.48908 13.9445 8.94455C13.4891 9.40002 12.9223 9.58569 12.2945 9.67009C11.6997 9.75006 10.9505 9.75003 10.052 9.75H4.94801C4.04953 9.75003 3.3003 9.75006 2.70552 9.67009C2.07773 9.58569 1.51093 9.40002 1.05546 8.94455C0.599989 8.48908 0.414318 7.92228 0.329913 7.29448C0.249947 6.6997 0.249972 5.95048 0.250001 5.052V4.948C0.249972 4.04952 0.249947 3.3003 0.329913 2.70552C0.414318 2.07773 0.599989 1.51093 1.05546 1.05546C1.51093 0.599989 2.07773 0.414318 2.70552 0.329913C3.3003 0.249947 4.04952 0.249972 4.948 0.250001ZM2.90539 1.81654C2.44393 1.87858 2.24644 1.9858 2.11612 2.11612C1.9858 2.24644 1.87858 2.44393 1.81654 2.90539C1.77009 3.25089 1.75605 3.68056 1.75182 4.25H4.25V1.75182C3.68056 1.75605 3.25089 1.77009 2.90539 1.81654ZM5.75 1.75V8.25H9.25V1.75H5.75ZM10.75 1.75182V4.25H13.2482C13.244 3.68056 13.2299 3.25089 13.1835 2.90539C13.1214 2.44393 13.0142 2.24644 12.8839 2.11612C12.7536 1.9858 12.5561 1.87858 12.0946 1.81654C11.7491 1.77009 11.3194 1.75605 10.75 1.75182ZM13.2482 5.75H10.75V8.24819C11.3194 8.24396 11.7491 8.22992 12.0946 8.18347C12.5561 8.12143 12.7536 8.0142 12.8839 7.88389C13.0142 7.75357 13.1214 7.55607 13.1835 7.09461C13.2299 6.74911 13.244 6.31944 13.2482 5.75ZM4.25 8.24819V5.75H1.75182C1.75605 6.31944 1.77009 6.74911 1.81654 7.09461C1.87858 7.55607 1.9858 7.75357 2.11612 7.88389C2.24644 8.0142 2.44393 8.12143 2.90539 8.18347C3.25089 8.22992 3.68056 8.24396 4.25 8.24819ZM18.0433 5.76729C17.7958 5.75041 17.4762 5.75 17 5.75C16.5858 5.75 16.25 5.41422 16.25 5C16.25 4.58579 16.5858 4.25 17 4.25L17.0253 4.25C17.4697 4.24999 17.8408 4.24999 18.1454 4.27077C18.4625 4.29241 18.762 4.33905 19.0524 4.45933C19.7262 4.73844 20.2616 5.2738 20.5407 5.94762C20.6251 6.15155 20.6606 6.41236 20.6817 6.61233C20.7057 6.84059 20.7207 7.10675 20.7305 7.37872C20.7411 7.67507 20.746 7.99167 20.7482 8.29336C21.0124 8.1994 21.3188 8.25817 21.5303 8.46967C21.8232 8.76257 21.8232 9.23744 21.5303 9.53033L20.5303 10.5303C20.2374 10.8232 19.7626 10.8232 19.4697 10.5303L18.4697 9.53033C18.1768 9.23744 18.1768 8.76257 18.4697 8.46967C18.6802 8.25915 18.9847 8.19995 19.2481 8.29205C19.246 8.00421 19.2414 7.70798 19.2315 7.43266C19.2222 7.17572 19.2087 6.94823 19.1899 6.76914C19.1749 6.62668 19.16 6.55364 19.1549 6.52841C19.1526 6.51691 19.1522 6.51534 19.1549 6.52165C19.028 6.21536 18.7846 5.97202 18.4784 5.84515C18.4012 5.81319 18.284 5.78372 18.0433 5.76729ZM1.46967 11.4697C1.76257 11.1768 2.23744 11.1768 2.53033 11.4697L3.53033 12.4697C3.82323 12.7626 3.82323 13.2374 3.53033 13.5303C3.31981 13.7409 3.01528 13.8001 2.75188 13.708C2.75403 13.9958 2.75864 14.292 2.76855 14.5673C2.77779 14.8243 2.79129 15.0518 2.81012 15.2309C2.82509 15.3733 2.83997 15.4464 2.8451 15.4716C2.84745 15.4831 2.84777 15.4847 2.84515 15.4784C2.97202 15.7846 3.21536 16.028 3.52165 16.1549C3.5988 16.1868 3.71602 16.2163 3.95674 16.2327C4.20421 16.2496 4.5238 16.25 5 16.25C5.41422 16.25 5.75 16.5858 5.75 17C5.75 17.4142 5.41422 17.75 5 17.75H4.97474C4.53029 17.75 4.15925 17.75 3.85464 17.7292C3.53754 17.7076 3.23801 17.661 2.94762 17.5407C2.2738 17.2616 1.73844 16.7262 1.45933 16.0524C1.37486 15.8485 1.33936 15.5876 1.31834 15.3877C1.29435 15.1594 1.2793 14.8933 1.26952 14.6213C1.25886 14.3249 1.25402 14.0083 1.25182 13.7066C0.98758 13.8006 0.681178 13.7418 0.469672 13.5303C0.176779 13.2374 0.176779 12.7626 0.469672 12.4697L1.46967 11.4697ZM12.948 12.25H16.052C16.9505 12.25 17.6997 12.2499 18.2945 12.3299C18.9223 12.4143 19.4891 12.6 19.9445 13.0555C20.4 13.5109 20.5857 14.0777 20.6701 14.7055C20.7501 15.3003 20.75 16.0495 20.75 16.948V17.052C20.75 17.9505 20.7501 18.6997 20.6701 19.2945C20.5857 19.9223 20.4 20.4891 19.9445 20.9445C19.4891 21.4 18.9223 21.5857 18.2945 21.6701C17.8077 21.7355 17.2174 21.7474 16.5266 21.7495C16.5178 21.7498 16.5089 21.75 16.5 21.75C16.4925 21.75 16.4851 21.7499 16.4776 21.7497C16.3397 21.75 16.1978 21.75 16.052 21.75H12.948C12.8022 21.75 12.6603 21.75 12.5224 21.7497C12.5149 21.7499 12.5075 21.75 12.5 21.75C12.4911 21.75 12.4822 21.7498 12.4734 21.7495C11.7826 21.7474 11.1923 21.7355 10.7055 21.6701C10.0777 21.5857 9.51093 21.4 9.05546 20.9445C8.59999 20.4891 8.41432 19.9223 8.32991 19.2945C8.24995 18.6997 8.24997 17.9505 8.25 17.052V16.948C8.24997 16.0495 8.24995 15.3003 8.32991 14.7055C8.41432 14.0777 8.59999 13.5109 9.05546 13.0555C9.51093 12.6 10.0777 12.4143 10.7055 12.3299C11.3003 12.2499 12.0495 12.25 12.948 12.25ZM13.25 20.25H15.75V13.75H13.25V20.25ZM11.75 17.75V20.2405C11.4173 20.2318 11.1416 20.2152 10.9054 20.1835C10.4439 20.1214 10.2464 20.0142 10.1161 19.8839C9.9858 19.7536 9.87858 19.5561 9.81654 19.0946C9.76895 18.7406 9.75538 18.2983 9.75152 17.7079C9.82929 17.7352 9.91291 17.75 10 17.75H11.75ZM11.75 16.25V13.7595C11.4173 13.7682 11.1416 13.7848 10.9054 13.8165C10.4439 13.8786 10.2464 13.9858 10.1161 14.1161C9.9858 14.2464 9.87858 14.4439 9.81654 14.9054C9.76895 15.2594 9.75538 15.7017 9.75152 16.2921C9.82929 16.2649 9.91291 16.25 10 16.25H11.75ZM17.25 13.7595V16.25H19.2482C19.244 15.6806 19.2299 15.2509 19.1835 14.9054C19.1214 14.4439 19.0142 14.2464 18.8839 14.1161C18.7536 13.9858 18.5561 13.8786 18.0946 13.8165C17.8584 13.7848 17.5827 13.7682 17.25 13.7595ZM19.2482 17.75H17.25V20.2405C17.5827 20.2318 17.8584 20.2152 18.0946 20.1835C18.5561 20.1214 18.7536 20.0142 18.8839 19.8839C19.0142 19.7536 19.1214 19.5561 19.1835 19.0946C19.2299 18.7491 19.244 18.3194 19.2482 17.75Z"
      fill="currentColor"
    />
  </svg>
)

export default SwitchChannelOutline
