import '../styles/shared/GaugeBar.css';

export const GaugeBar = () => {
  return (
    <div className="gauge-bar">
       <div style={{flex: `1 0 25.5%`}} className='gauge-bar__data gauge-bar__data--likes'>
          <div className='gauge-bar__data__content'>
            <img src="./assets/img/thumbs-up.svg" alt="thumbs-up" />
            <p>25.5%</p>
          </div>
       </div>
       <div style={{flex: `1 0 74.5%`}} className='gauge-bar__data gauge-bar__data--dislikes'>
          <div className='gauge-bar__data__content'>
            <p>74.5%</p>
            <img src="./assets/img/thumbs-down.svg" alt="thumbs-down" />
          </div>
       </div>
    </div>
  )
}
