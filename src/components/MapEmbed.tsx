const MapEmbed = ({ src }: { src: string }) => {
  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <iframe
        src={src}
        className="w-full h-full rounded-3xl shadow-2xl"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
