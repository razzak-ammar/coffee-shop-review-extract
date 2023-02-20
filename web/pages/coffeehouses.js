import Header from '@/components/Header';
import { useState } from 'react';
import prisma from '@/prisma-client';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default (props) => {
  const [showAdd, setShowAdd] = useState();
  const [coffeeHouseName, setCoffeeHouseName] = useState('');
  const [coffeeHouseUrl, setCoffeeHouseUrl] = useState('');
  const [coffeeHouseRegion, setCoffeeHouseRegion] = useState('');
  const [alert, setAlert] = useState('');

  const router = useRouter();

  const addCoffeeHouse = async () => {
    if (
      coffeeHouseName.length > 0 &&
      coffeeHouseRegion.length > 0 &&
      coffeeHouseUrl.length > 0
    ) {
      let response = await fetch('/api/add_coffeehouse', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          coffeeHouseName,
          coffeeHouseRegion,
          coffeeHouseUrl
        })
      });

      if (response.ok) {
        router.replace(router.asPath);
        setAlert('Coffeehouse Added!');
        setCoffeeHouseName('');
        setCoffeeHouseRegion('');
        setCoffeeHouseUrl('url');

        setTimeout(() => {
          setAlert('');
        }, 2000);
      }
    }
  };

  return (
    <>
      <Header />
      <div className='container my-2'>
        {alert.length > 0 ? (
          <div className='alert alert-success'>{alert}</div>
        ) : null}
        <button
          className='btn btn-warning'
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? 'Hide Form' : 'Add Coffeehouse'}
        </button>
        {showAdd ? (
          <div className='card my-4'>
            <div className='card-body'>
              <h5 className='card-title mb-3'>Add a Coffeehouse</h5>
              <div className='input-group my-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Coffeehouse Name'
                  value={coffeeHouseName}
                  onChange={(e) => setCoffeeHouseName(e.target.value)}
                />
              </div>

              <div className='input-group my-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Coffeehouse URL'
                  value={coffeeHouseUrl}
                  onChange={(e) => setCoffeeHouseUrl(e.target.value)}
                />
              </div>

              <div className='input-group my-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Region'
                  value={coffeeHouseRegion}
                  onChange={(e) => setCoffeeHouseRegion(e.target.value)}
                />
              </div>
              <button
                className='btn btn-danger'
                onClick={() => addCoffeeHouse()}
              >
                Add
              </button>
            </div>
          </div>
        ) : null}

        <ol class='list-group list-group-numbered my-3'>
          {props.coffeehouses.map((coffeehouse) => (
            <li class='list-group-item d-flex justify-content-between align-items-start'>
              <div class='ms-2 me-auto'>
                <Link href={`/coffeehouse/${coffeehouse.id}`}>
                  <h6 class='fw-bold'>{coffeehouse.name}</h6>
                </Link>
                Located in:{' '}
                <span
                  className={`badge rounded-pill text-bg-${
                    coffeehouse.region === 'Unknown' ? 'danger' : 'warning'
                  }`}
                >
                  {coffeehouse.region}
                </span>
              </div>
              <span
                class={`badge bg-${
                  coffeehouse.Review.length === 0 ? 'danger' : 'primary'
                } rounded-pill`}
              >
                {coffeehouse.Review.length}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  let coffeehouses = await prisma.coffeeHouse.findMany({
    include: {
      Review: {
        select: {
          id: true
        }
      }
    }
  });

  return {
    props: {
      coffeehouses: coffeehouses
    }
  };
}
