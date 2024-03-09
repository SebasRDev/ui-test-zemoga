import '../styles/shared/Card.css'
import { GaugeBar } from './GaugeBar'
import { Thumb } from './Thumb'

export const Card = () => {
  return (
    <div className="voting-card">
      <img className="voting-card__portrait" src="./assets/img/Kanye.webp" alt="Kanye West" />
      <div className='voting-card__content'>
        <div className="voting-card__data">
          <div className='voting-card__thumb-average'>
            <Thumb type="down" />
          </div>
          <h4>Kanye West</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem quaerat pariatur voluptatum, sequi magni eius animi! Nam quod porro cumque exercitationem in et eaque quae. Iste, architecto. Sequi, commodi necessitatibus?</p>
        </div>
        <div className='votin-card__votes'>
          <p>1 Month ago in Entertainment</p>
          <Thumb type="up" />
          <Thumb type="down" />
          <button>Vote now</button>
        </div>
        <GaugeBar />
      </div>
    </div>
  )
}