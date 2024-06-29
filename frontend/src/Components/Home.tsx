import { FaHeart, FaUserCircle } from 'react-icons/fa';
import sample300Img from '../assets/images/sample-300.png';
import { AppLayout } from './Layouts/AppLayout';

const Home = () => {
  return (
    <AppLayout>
      <div className="mt-auto flex-1 bg-zinc-900 p-1 text-white">
        <section className="h-[80vh] space-y-2 overflow-y-auto">
          {new Array(10).fill(0).map((_, index) => (
            <div className="flex flex-col bg-zinc-950">
              <div className="min-h-[20px] p-4">
                <div className="flex items-center gap-2">
                  <FaUserCircle />
                  <p className="text-sm">Lorem ipsum</p>
                </div>
              </div>
              <img src={sample300Img} className="aspect-square w-[full] object-cover" alt="image" />
              <div className="flex min-h-[20px] items-center justify-between p-4">
                <p className="text-sm">Likes 0</p>
                <FaHeart size={22} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </AppLayout>
  );
};

export default Home;
