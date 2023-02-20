import Header from '@/components/Header';
import prisma from '@/prisma-client';

export default (props) => {
  const colors = {
    'Venice, Italy': 'primary',
    Unknown: 'danger'
  };
  return (
    <>
      <Header />
      <div className='container my-4'>
        <div className='list-group'>
          {props.keywords.length >= 0 ? (
            props.keywords.map((keyword) => (
              <li className='list-group-item' aria-current='true'>
                <div
                  className={`badge bg-${
                    colors[keyword.review.coffeehouse.region] || 'warning'
                  } mx-2`}
                >
                  {keyword.review.coffeehouse.region}
                </div>
                <span>{keyword.phrase}</span>
              </li>
            ))
          ) : (
            <p>No Reviews Added Recently</p>
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  let keywords = await prisma.keyword.findMany({
    include: {
      review: {
        include: {
          coffeehouse: {
            select: {
              region: true
            }
          }
        }
      }
    }
  });
  return {
    props: {
      keywords: keywords
    }
  };
}
