


const MapEmbed = () => {
  return (
    <div style={{ width: '100%', height: '400px', margin: '20px 0' }}>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8620752274305!2d29.935762399999998!3d40.7650582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4f87128f0c97%3A0x944f3b6dad28cccb!2sIzmit%20High%20School!5e0!3m2!1sen!2s!4v1718215613042!5m2!1sen!2s" 
        className="w-full h-full"
        style={{ border: 0 }} 
        allowFullScreen
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
