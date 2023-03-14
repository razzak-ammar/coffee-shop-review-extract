import Header from '@/components/Header';
import prisma from '@/prisma-client';
import Link from 'next/link';

export default function IndividualCoffeeHouse(props) {
  console.log(props.reviews[0]);
  return (
    <>
      <Header />
      <div className='container my-3'>
        <h2>Reviews for {props.coffeehouse.name}</h2>
        <Link href={props.coffeehouse.url} className='text-primary'>
          Link to Coffeehouse Site
        </Link>
        <div>
          <span className='badge bg-danger'>{props.coffeehouse.region}</span>
        </div>
        <div className='row row-cols-3 my-3'>
          {props.reviews.map((review) =>
            review.filtered ? null : (
              <div className='col'>
                <div className='card m-1'>
                  <div className='card-body'>
                    {review.Keyword.length > 0 ? (
                      <div className='badge bg-primary'>
                        {review.Keyword.length} keywords
                      </div>
                    ) : (
                      <div className='badge bg-danger'>0 Keywords</div>
                    )}

                    <h5 className='card-title'>{review.title}</h5>
                    <p className='card-text'>{review.text}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  //   let reviews = await prisma.review.findMany({
  //     where: { coffeeHouseId: Number(context.params['id']) }
  //   });

  let coffeeHouse = await prisma.coffeeHouse.findFirst({
    where: { id: Number(context.params['id']) },
    select: {
      name: true,
      url: true,
      region: true,
      Review: {
        include: {
          Keyword: {
            select: {
              id: true
            }
          }
        }
      }
    }
  });

  return {
    props: {
      reviews: coffeeHouse.Review,
      id: context.params['id'],
      coffeehouse: coffeeHouse
    }
  };
}
