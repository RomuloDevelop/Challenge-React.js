import { useEffect } from "react"
import useCountryInfo from "../../hooks/useCountryInfo"
import { SelectedUniversity } from "../../store/user/types"
import Spinner from "../Spinner"
import notifyConfig from "../../utils/notifyConfig"
import { toast, ToastContainer } from "react-toastify"
import './UniversityDetail.scss'

type Props = {item: SelectedUniversity}

const UniversityDetail = (props: Props) => {
  const {item} = props
  const [countryInfo, loading, error] = useCountryInfo(item)

  useEffect(() => {
    if (error) {
      toast('An error ocuured while fetching data, please try again', {...notifyConfig, type: 'error'})
    }
  }, [error])
  return (
    <div>

      <h3 className="detail-title">{item.name}</h3>
      {

          loading ?
          <div className="loader">
            <Spinner></Spinner>
          </div> :
          <>
          <p>
            {item.description}
          </p>
          {
            (countryInfo && !error) ? <>
            <ul className="detail-list">
              <li>
                Website: <a href={item.web_pages[0]} target="_blank" rel="noopener noreferrer">{item.web_pages[0]}</a>
              </li>
              <li>
                Location: {item.country}{
                  item["state-province"] && `, ${item["state-province"]}`
                }
              </li>
              <li>
                Country's capital: {countryInfo?.capital[0]}
              </li>
              <li>
                Currency: {
                  countryInfo?.currencies.map((item: any, i: number, length: number) => (
                    `${item.data.name} (${item.code})${(i !== length - 1) && ', ' }`
                  ))
                }
              </li>
              <li>
                Languages: {
                  countryInfo?.languages.map((item: any, i: number, length: number) => (
                    `${item.data} (${item.code})${(i !== length - 1) && ', ' }`
                  ))
                }
              </li>
              <li>
                Population: {
                  countryInfo?.population
                }
              </li>
            </ul>
            <div className="detail-weather">
              <h4>Weather description</h4>
              <p>
                At the moment, with a temperature of {countryInfo.weather.temp2m} and a precipitation amount {countryInfo.weather.prec_amount},
                we have a {countryInfo.weather.prec_type_description} in the region in general, 
                so you {
                  countryInfo.weather.prec_type !== 'none' ? 
                  'might want to wait at home until the weather changes' :
                  'can go around without any problem'
                }.
              </p>
            </div>
          </> :
          <p className="mt-5 font-bold">No country description</p>
          }
        </>
      }
      <ToastContainer />
    </div>
  )
}

export default UniversityDetail