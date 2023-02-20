import Header from '@/components/Header';
import prisma from '@/prisma-client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default (props) => {
  const [phrase, setPhrase] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [alert, setAlert] = useState('');

  const addKeyword = async (e) => {
    e.preventDefault();
    let response = await fetch('/api/add_keyword', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        keywordPhrase: phrase,
        reviewId: id
      })
    });

    if (response.ok) {
      router.replace(router.asPath);
      setAlert('Keyword Added!');
      setPhrase('');

      setTimeout(() => {
        setAlert('');
      }, 2000);
    }
  };

  if (props.review === null) {
    return (
      <>
        <Header />
        <div className='container my-4'>
          <div className='alert alert-danger'>Review Does Not Exist</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className='container'>
        {id != 1 && (
          <Link
            className='btn btn-danger m-3'
            href={`/review/${Number(id) - 1}`}
          >
            Previous
          </Link>
        )}
        <Link
          className='btn btn-primary m-3'
          href={`/review/${Number(id) + 1}`}
        >
          Next
        </Link>
        <div className='card m-4'>
          <div className='card-body'>
            {props.review.filtered ? (
              <div className='alert alert-danger' role='alert'>
                Has been chosen to be filtered
              </div>
            ) : null}
            <small className='card-subtitle'>
              {props.review.coffeehouse.name}
            </small>
            <h2 className='card-title'>{props.review.title}</h2>
            <p className='card-text'>{props.review.text}</p>
            {alert.length > 0 ? (
              <div className='alert alert-success'>{alert}</div>
            ) : null}
            <form onSubmit={addKeyword}>
              <div className='input-group my-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Keyword (ex. amazing coffee)'
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                />
                <button class='btn btn-outline-success' type='submit'>
                  Add
                </button>
              </div>
            </form>

            {props.review.Keyword && props.review.Keyword.length > 0 ? (
              <ul className='list-group'>
                <li className='list-group-item active'>Keywords</li>
                <ul className='list-group'>
                  {props.review.Keyword.map((keyword) => (
                    <li className='list-group-item' key={keyword._id}>
                      {keyword.phrase}
                    </li>
                  ))}
                </ul>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  let review = await prisma.review.findFirst({
    where: { id: Number(context.params['id']) },
    include: {
      Keyword: true,
      coffeehouse: true
    }
  });

  return {
    props: {
      review: review
    }
  };
}
