export default (props) => {

  const { article } = props;
  console.log(article);

  return (
    <div className="news-content">
      <a href={article?.link} target="_blank" style={{textDecoration: "none"}}>
        <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
          <div class="uk-card-media-left uk-cover-container">
            <img src={article?.poster} alt="" uk-cover/>
        </div>
        <div>
            <div class="uk-card-body">
                <h3 class="uk-card-title" style={{width: 370}}>{article?.judul}</h3>             
              <p>{article?.waktu}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  )

}