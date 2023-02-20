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
        {router.pathname !== '/import' && (
          <Link className='btn btn-warning' href='/import'>
            Add Review
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
