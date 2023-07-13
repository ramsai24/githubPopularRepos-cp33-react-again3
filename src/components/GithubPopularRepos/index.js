import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'

import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const apiStatusConstant = {
  initial: 'INITAIL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    githubRepoApiUrl: languageFiltersData[0].id,
    githubRepoData: [],

    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getGithubList()
  }

  languageIdUpdate = id => {
    console.log(id)
    this.setState({githubRepoApiUrl: id}, this.getGithubList)
  }

  getGithubList = async () => {
    this.setState({apiStatus: 'INPROGRESS'})
    const {githubRepoApiUrl} = this.state
    console.log(githubRepoApiUrl)
    const url = `https://apis.ccbp.in/popular-repos?language=${githubRepoApiUrl}`
    // const options = {
    //   method: 'GET',
    // }
    const response = await fetch(url)
    const data = await response.json()
    console.log(response)
    console.log(data.popular_repos)

    const updatedList = data.popular_repos.map(each => ({
      avatarUrl: each.avatar_url,
      forksCount: each.forks_count,
      id: each.id,
      issuesCount: each.issues_count,
      name: each.name,
      starsCount: each.stars_count,
    }))
    if (response.ok) {
      this.setState({
        githubRepoData: updatedList,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  languageView = () => (
    <div>
      <h1>Popular</h1>
      <ul className="language-item-container">
        {languageFiltersData.map(languageItem => (
          <LanguageFilterItem
            languagefilterItem={languageItem}
            languageIdUpdate={this.languageIdUpdate}
            key={languageItem.id}
          />
        ))}
      </ul>
    </div>
  )

  renderInitialView = () => (
    <div className="app-container">
      {this.languageView()}
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </div>
  )

  renderLanguageView = () => {
    const {githubRepoData} = this.state
    return (
      <div className="app-container">
        {this.languageView()}

        <ul>
          {githubRepoData.map(each => (
            <RepositoryItem repoItem={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      {this.languageView()}
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    // console.log(githubRepoData, isLoading, githubRepoApiUrl)
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderInitialView()
      case apiStatusConstant.success:
        return this.renderLanguageView()

      default:
        return this.renderFailureView()
    }
  }
}

export default GithubPopularRepos
