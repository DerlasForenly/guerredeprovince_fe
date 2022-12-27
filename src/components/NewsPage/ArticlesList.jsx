import Pagination from 'src/components/Pagination';

function ArticlesList ({ pagination = false, articles, children }) {
  return <div>
    <Header />
    {pagination ? <Pagination /> : <div />}
  </div>;
}

export default ArticlesList;

function Header () {
  return <div>

  </div>;
}