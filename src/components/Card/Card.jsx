export default function Card({ thumbnail, name, description }) {
  // Pour les comics le name est égale au title
  return (
    <div>
      <div>
        <img
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={`Comic: ${name}`}
          title={`Comic: ${name}`}
          width={174}
          height={260}
        />
        <p>{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
