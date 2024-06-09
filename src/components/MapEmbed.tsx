

const MapEmbed = () => {
  return (
    <div style={{ width: '100%', height: '400px', margin: '20px 0' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.057674745265!2d29.939322999999995!3d40.760756199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4568a5555555%3A0x9593ffebc22d9857!2sKocaeli%20Chamber%20of%20Industry!5e0!3m2!1sen!2s!4v1717864868789!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default MapEmbed;