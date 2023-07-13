// Write your code here

import './index.css'

const RepoistoryItem = props => {
  const {repoItem} = props
  console.log(repoItem)
  const {avatarUrl, name, forksCount, issuesCount, starsCount} = repoItem

  return (
    <li>
      <img src={avatarUrl} alt={name} />
      <div className="icons-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <h1>{name}</h1>
        <p>{starsCount} stars</p>
      </div>
      <div className="icons-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="icons-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} openissues</p>
      </div>
    </li>
  )
}

export default RepoistoryItem
