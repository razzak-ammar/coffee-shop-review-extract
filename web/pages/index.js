import Head from 'next/head';
import Image from 'next/image';
import prisma from '../prisma-client';
import Header from '../components/Header';
import Link from 'next/link';

export default function Home(props) {
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
          <div className='row row-cols-3'>
            {props.reviews.map((review) => (
              <>
                <div class='col'>
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
  let reviews = await prisma.review.findMany({
    include: {
      coffeehouse: true,
      Keyword: true
    }
  });

  return {
    props: {
      reviews: reviews
    }
  };
}
