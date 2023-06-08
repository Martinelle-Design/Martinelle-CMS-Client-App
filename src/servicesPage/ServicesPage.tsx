import { LazyLoadImage } from "react-lazy-load-image-component";
import PageTitle from "../utilities/pageTitle/PageTitle";
import { servicesData } from "./servicesData";
import seperateToWords from "../utilities/helpers/seperateToWords";
const namespace = "services-pg";
type ServiceRowProps = {
  title: string;
  imgUrl?: string;
  imgPlaceholderUrl?: string;
  imgDescription?: string;
  items: string[];
};
const ServiceRow = ({
  title,
  imgUrl,
  imgPlaceholderUrl,
  imgDescription,
  items,
}: ServiceRowProps) => {
  return (
    <div className={`${namespace}-row`}>
      <h2>{title}</h2>
      <div className={`${namespace}-row-container`}>
        <div className={`${namespace}-row-img`}>
          <LazyLoadImage
            src={imgUrl}
            alt={imgDescription}
            placeholderSrc={imgPlaceholderUrl}
            effect="blur"
          />
        </div>
        <div className={`${namespace}-row-items-container`}>
          <ul className={`${namespace}-row-items`}>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
const ServicesPage = () => {
  const orderedServicePageItems = servicesData.sort(
    (a, b) => a.orderIdx - b.orderIdx
  );
  return (
    <div className={namespace}>
      <PageTitle text={"Services".toUpperCase()} />
      <div className={`${namespace}-rows`}>
        {orderedServicePageItems.map((service) => {
          const { id, images, subCategories, subType } = service;
          const imgEntries = Object.entries(images);
          const imgOrder = imgEntries.sort((a, b) =>
            a[1].orderIdx > b[1].orderIdx ? 1 : -1
          );
          const title = seperateToWords(subType).toUpperCase();
          return (
            <ServiceRow
              items={subCategories}
              title={title}
              key={id}
              imgUrl={imgOrder[0][1].imgUrl}
              imgDescription={imgOrder[0][1].description}
              imgPlaceholderUrl={imgOrder[0][1].placeholderUrl}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ServicesPage;
