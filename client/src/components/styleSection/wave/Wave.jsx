import './Wave.css'

function Wave({ fill, bgColor, path }) {
  return (
    <div className="wave" style={{ backgroundColor: bgColor }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d={path} fill={fill} />
      </svg>
    </div>
  )
}

export default Wave
