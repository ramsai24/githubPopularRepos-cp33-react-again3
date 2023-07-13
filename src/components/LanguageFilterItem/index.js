// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {languagefilterItem, languageIdUpdate} = props
  const {id, language} = languagefilterItem

  const languageUpdate = () => {
    languageIdUpdate(id)
  }

  //   console.log(id)
  return (
    <li>
      <button type="button" onClick={languageUpdate}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
