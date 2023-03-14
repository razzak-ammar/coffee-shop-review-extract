import Head from 'next/head';
import Image from 'next/image';
import prisma from '../prisma-client';
import Header from '../components/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home(props) {
  const router = useRouter();

  console.log(router.query.filter);

  return (
    <>
      <Head>
        <title>Reviews Analysis</title>
        <meta name='description' content='Coffee reviews analysis simple app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>
        <div className='container my-3'>
          <h3>All Reviews</h3>
          {router.query.filter === 'true' ? (
            <div className='my-2'>
              <span class='badge rounded-pill text-bg-danger'>
                {props.length}
              </span>{' '}
              reviews remaining
            </div>
          ) : (
            <div className='my-2'>
              <span class='badge rounded-pill text-bg-primary'>
                {props.length}
              </span>{' '}
              total reviews
            </div>
          )}
          <button
            onClick={() => router.push('/?filter=false')}
            className={`btn ${
              router.query['filter'] === 'false' ||
              router.query['filter'] === undefined
                ? 'btn-primary'
                : 'btn-outline-primary'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => router.push('/?filter=true')}
            className={`btn mx-3 ${
              router.query['filter'] === 'true'
                ? 'btn-danger'
                : 'btn-outline-danger'
            }`}
          >
            Need to Analyze
          </button>
          <div className='row row-cols-3'>
            {props.reviews.map((review) => (
              <>
                <div className='col'>
                  <div
                    className={`card m-2 ${
                      review.filtered ? 'text-bg-light' : null
                    }`}
                  >
                    <div className='card-body'>
                      <h5 className='card-title'>{review.title}</h5>
                      <div className='div'>
                        <mark>{review.coffeehouse.name}</mark>
                        {review.Keyword && review.Keyword.length > 0 ? (
                          <span className='badge bg-danger mx-2 rounded-pill'>
                            {review.Keyword.length} keywords
                          </span>
                        ) : null}
                      </div>
                      <p className='card-text'>{review.text}</p>
                      <Link
                        className={`btn ${
                          review.filtered ? 'btn-secondary' : 'btn-warning'
                        } btn-sm`}
                        href={`/review/${review.id}`}
                      >
                        Analyze →
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  console.log('PARAMS - ' + context.query['filter']);

  let reviews;

  if (context.query.filter === 'true') {
    reviews = await prisma.review.findMany({
      where: {
        Keyword: {
          none: {}
        },
        filtered: false
      },
      include: {
        coffeehouse: true,
        Keyword: true
      }
    });
  } else {
    reviews = await prisma.review.findMany({
      include: {
        coffeehouse: true,
        Keyword: true
      }
    });
  }

  return {
    props: {
      reviews: reviews,
      length: reviews.length
    }
  };
}
