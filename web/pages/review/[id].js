import Header from '@/components/Header';
import prisma from '@/prisma-client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default (props) => {
  const [phrase, setPhrase] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const [alert, setAlert] = useState('');
  const inputRef = useRef();

  if (inputRef.current) {
    inputRef.current.focus();
  }
  const addKeyword = async (e) => {
    e.preventDefault();
    if (phrase.length < 1) {
      return;
    }
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
      }, 200);
    }
  };

  const filterReview = () => {
    fetch(`/api/review/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        filter: !props.review.filtered
      })
    }).then((res) => {
      console.log(res.json());
      router.replace(router.asPath);
    });
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
          <Link className='btn btn-danger m-3' href={`/review/${props.prevId}`}>
            Previous
          </Link>
        )}
        <Link className='btn btn-primary m-3' href={`/review/${props.nextId}`}>
          Next
        </Link>
        <div className='card m-4'>
          <div className='card-body'>
            <div class='form-check'>
              <input
                class='form-check-input'
                type='checkbox'
                value=''
                id='flexCheckChecked'
                checked={props.review.filtered ? true : false}
                onChange={() => filterReview()}
              />
              <label class='form-check-label' for='flexCheckChecked'>
                Filter Review
              </label>
            </div>
            {props.review.filtered ? (
              <div className='alert alert-danger my-2' role='alert'>
                Has been chosen to be filtered
              </div>
            ) : null}
            <span class='badge rounded-pill text-bg-warning mt-4 mb-2'>
              {props.review.coffeehouse.region}
            </span>{' '}
            <div className='card-subtitle'>{props.review.coffeehouse.name}</div>
            <h2 className='card-title'>{props.review.title}</h2>
            <p className='card-text'>{props.review.text}</p>
            {alert.length > 0 ? (
              <div className='alert alert-success'>{alert}</div>
            ) : null}
            <form onSubmit={addKeyword}>
              <div className='input-group my-3'>
                <input
                  disabled={props.review.filtered}
                  type='text'
                  className='form-control'
                  placeholder='Keyword (ex. amazing coffee)'
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                      router.push(`/review/${props.nextId}`);
                    }
                  }}
                  ref={inputRef}
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
  // * Gets the current review
  let review = await prisma.review.findFirst({
    where: { id: Number(context.params['id']) },
    include: {
      Keyword: true,
      coffeehouse: true
    }
  });

  // * Get next record
  let nextId = await prisma.review.findMany({
    take: 1,
    where: {
      id: {
        gt: Number(context.query.id)
      }
    },
    orderBy: {
      id: 'asc'
    },
    select: {
      id: true
    }
  });

  // * Get Previous Record
  let prevId = await prisma.review.findMany({
    take: 1,
    where: {
      id: {
        lt: Number(context.query.id)
      }
    },
    orderBy: {
      id: 'desc'
    },
    select: {
      id: true
    }
  });

  return {
    props: {
      review: review,
      prevId: prevId.length === 0 ? null : prevId[0].id,
      nextId: nextId.length === 0 ? null : nextId[0].id
    }
  };
}
