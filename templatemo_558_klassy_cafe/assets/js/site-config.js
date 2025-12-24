(() => {
  const config = {
    name: 'La Paradita Caf\u00e9',
    website: 'https://laparaditacafe.com',
    phone: {
      display: '+34 600 000 000',
      link: 'tel:+34600000000'
    },
    whatsapp: {
      display: '+34 600 000 000',
      link: 'https://wa.me/34600000000'
    },
    address: {
      line1: 'Direcci\u00f3n pendiente de confirmar',
      line2: 'Valencia, Espa\u00f1a',
      full: 'Direcci\u00f3n pendiente de confirmar, Valencia, Espa\u00f1a'
    },
    maps: {
      link: 'https://maps.app.goo.gl/93n7FwcSfWpYW9YC6',
      embed: 'https://www.google.com/maps?q=La+Paradita+Cafe+Valencia&output=embed'
    },
    instagram: {
      handle: '@laparaditacafe',
      link: 'https://www.instagram.com/laparaditacafe/?hl=es'
    },
    reviews: {
      link: 'https://maps.app.goo.gl/93n7FwcSfWpYW9YC6'
    },
    hours: [
      { label: 'Lunes a Viernes', value: '08:00 - 20:00' },
      { label: 'S\u00e1bado', value: '09:00 - 21:00' },
      { label: 'Domingo', value: '09:00 - 19:00' }
    ],
    hoursSchema: ['Mo-Fr 08:00-20:00', 'Sa 09:00-21:00', 'Su 09:00-19:00']
  };

  window.LAPARADITA_CONFIG = config;

  const getValue = (path) => {
    return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), config);
  };

  const applyConfig = () => {
    document.querySelectorAll('[data-config-text]').forEach((el) => {
      const value = getValue(el.dataset.configText);
      if (value) {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-config-href]').forEach((el) => {
      const value = getValue(el.dataset.configHref + '.link') || getValue(el.dataset.configHref);
      if (value) {
        el.setAttribute('href', value);
      }
    });

    document.querySelectorAll('[data-config-src]').forEach((el) => {
      const value = getValue(el.dataset.configSrc);
      if (value) {
        el.setAttribute('src', value);
      }
    });

    const hoursList = document.querySelector('[data-config-list="hours"]');
    if (hoursList) {
      hoursList.innerHTML = config.hours
        .map((item) => `<li><span>${item.label}</span><span>${item.value}</span></li>`)
        .join('');
    }

    const jsonLd = document.getElementById('ld-json');
    if (jsonLd) {
      const data = {
        '@context': 'https://schema.org',
        '@type': 'CafeOrCoffeeShop',
        name: config.name,
        url: config.website,
        telephone: config.phone.display,
        image: 'assets/img/hero/hero-main.jpg',
        servesCuisine: ['Cafe', 'Brunch', 'Desserts'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: config.address.line1,
          addressLocality: 'Valencia',
          addressCountry: 'ES'
        },
        openingHours: config.hoursSchema,
        sameAs: [config.instagram.link, config.maps.link]
      };
      jsonLd.textContent = JSON.stringify(data, null, 2);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyConfig);
  } else {
    applyConfig();
  }
})();
