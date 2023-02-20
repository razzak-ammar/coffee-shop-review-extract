import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <nav className='navbar navbar-expand-lg bg-primary navbar-dark text-white'>
      <div className='container'>
        <Link className='navbar-brand' href='/'>
          Sentiment Analysis Tool
        </Link>
        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
          <li className='nav-item'>
            <Link
              className={`nav-link ${
                router.pathname == '/coffeehouses' ? 'active' : null
              }`}
              href='/coffeehouses'
            >
              Coffeehouses
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className={`nav-link ${
                router.pathname == '/keywords' ? 'active' : null
              }`}
              href='/keywords'
            >
              Keywords
            </Link>
          </li>
        </ul>
        {router.pathname !== '/import' && (
          <Link className='btn btn-light' href='/import'>
            Add Review
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
