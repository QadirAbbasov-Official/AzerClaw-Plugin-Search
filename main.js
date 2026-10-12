/**
 * Search Plugin - Search on Yandex and other search engines
 */

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class SearchPlugin {
  constructor(io) {
    this.io = io;
  }

  /**
   * Sleep function for specific duration
   */
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Performs Yandex search
   */
  async yandexSearch(args) {
    const { query, resultCount = 10 } = args;

    if (!query) {
      throw new Error('Search query is required');
    }

    let driver;
    try {
      // Chrome options - headless mode
      const options = new chrome.Options();
      options.addArguments('--headless=new');
      options.addArguments('--no-sandbox');
      options.addArguments('--disable-dev-shm-usage');
      options.addArguments('--disable-gpu');
      options.addArguments('--disable-software-rasterizer');
      options.addArguments('--disable-extensions');
      options.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

      // Create driver
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

      // Create Yandex search URL
      const encodedQuery = encodeURIComponent(query);
      const url = `https://yandex.com.tr/search/?text=${encodedQuery}`;
      
      console.log(`Performing Yandex search: ${query}`);
      await driver.get(url);

      // Wait for page to load
      await this.sleep(5000);

      // Get all links
      const allLinks = await driver.findElements(By.css('a[href]'));
      
      // Filter results (search results usually contain links outside yandex.com.tr or yandex.com)
      const searchResults = [];
      for (const link of allLinks) {
        try {
          const href = await link.getAttribute('href');
          const text = await link.getText();
          
          // Skip empty links and same domain links
          if (href && text && text.length > 0 && !href.includes('yandex.com')) {
            searchResults.push({ title: text, link: href });
          }
        } catch (e) {
          continue;
        }
      }
      
      // Son N sonucu al
      const results = searchResults.slice(-resultCount);

      let output = `Yandex Search Results: "${query}"\n`;
      output += `Total ${searchResults.length} results found, last ${results.length} results:\n\n`;

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        output += `${i + 1}. ${result.title}\n`;
        output += `   ${result.link}\n\n`;
      }

      return output.trim();
    } catch (error) {
      throw new Error(`Yandex search error: ${error.message}`);
    } finally {
      // Close driver
      if (driver) {
        await driver.quit();
      }
    }
  }

  /**
   * Performs a Google search
   */
  async googleSearch(args) {
    const { query, resultCount = 10 } = args;

    if (!query) {
      throw new Error('Search query is required');
    }

    let driver;
    try {
      // Chrome options - headless mode
      const options = new chrome.Options();
      options.addArguments('--headless=new');
      options.addArguments('--no-sandbox');
      options.addArguments('--disable-dev-shm-usage');
      options.addArguments('--disable-gpu');
      options.addArguments('--disable-software-rasterizer');
      options.addArguments('--disable-extensions');
      options.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

      // Create driver
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

      // Create Google search URL
      const encodedQuery = encodeURIComponent(query);
      const url = `https://www.google.com/search?q=${encodedQuery}`;
      
      console.log(`Performing Google search: ${query}`);
      await driver.get(url);

      // Wait for page to load
      await this.sleep(5000);

      // Get all links
      const allLinks = await driver.findElements(By.css('a[href]'));
      
      // Filter results (search results usually contain links outside google.com)
      const searchResults = [];
      for (const link of allLinks) {
        try {
          const href = await link.getAttribute('href');
          const text = await link.getText();
          
          // Skip empty links and same domain links
          if (href && text && text.length > 0 && !href.includes('google.com') && !href.startsWith('#')) {
            searchResults.push({ title: text, link: href });
          }
        } catch (e) {
          continue;
        }
      }
      
      // Get first N results
      const results = searchResults.slice(0, resultCount);

      let output = `Google Search Results: "${query}"\n`;
      output += `Total ${searchResults.length} results found, first ${results.length} results:\n\n`;

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        output += `${i + 1}. ${result.title}\n`;
        output += `   ${result.link}\n\n`;
      }

      return output.trim();
    } catch (error) {
      throw new Error(`Google search error: ${error.message}`);
    } finally {
      // Close driver
      if (driver) {
        await driver.quit();
      }
    }
  }

  /**
   * Performs a DuckDuckGo search
   */
  async duckDuckGoSearch(args) {
    const { query, resultCount = 10 } = args;

    if (!query) {
      throw new Error('Search query is required');
    }

    let driver;
    try {
      // Chrome options - headless mode
      const options = new chrome.Options();
      options.addArguments('--headless=new');
      options.addArguments('--no-sandbox');
      options.addArguments('--disable-dev-shm-usage');
      options.addArguments('--disable-gpu');
      options.addArguments('--disable-software-rasterizer');
      options.addArguments('--disable-extensions');
      options.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

      // Create driver
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

      // Create DuckDuckGo search URL
      const encodedQuery = encodeURIComponent(query);
      const url = `https://duckduckgo.com/?q=${encodedQuery}`;
      
      console.log(`Performing DuckDuckGo search: ${query}`);
      await driver.get(url);

      // Wait for page to load
      await this.sleep(5000);

      // Get all links
      const allLinks = await driver.findElements(By.css('a[href]'));
      
      // Filter results (search results usually contain links outside duckduckgo.com)
      const searchResults = [];
      for (const link of allLinks) {
        try {
          const href = await link.getAttribute('href');
          const text = await link.getText();
          
          // Skip empty links and same domain links
          if (href && text && text.length > 0 && !href.includes('duckduckgo.com') && !href.startsWith('#')) {
            searchResults.push({ title: text, link: href });
          }
        } catch (e) {
          continue;
        }
      }
      
      // Get first N results
      const results = searchResults.slice(0, resultCount);

      let output = `DuckDuckGo Search Results: "${query}"\n`;
      output += `Total ${searchResults.length} results found, first ${results.length} results:\n\n`;

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        output += `${i + 1}. ${result.title}\n`;
        output += `   ${result.link}\n\n`;
      }

      return output.trim();
    } catch (error) {
      throw new Error(`DuckDuckGo search error: ${error.message}`);
    } finally {
      // Close driver
      if (driver) {
        await driver.quit();
      }
    }
  }

  /**
   * Returns tools for plugin registration
   */
  getTools() {
    return {
      yandexSearch: {
        handler: this.yandexSearch.bind(this),
        description: 'Searches with the Yandex search engine',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Arama sorgusu'
            },
            resultCount: {
              type: 'number',
              description: 'How many results to show (default: 10)',
              default: 10
            }
          },
          required: ['query']
        }
      },
      googleSearch: {
        handler: this.googleSearch.bind(this),
        description: 'Searches with the Google search engine',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Arama sorgusu'
            },
            resultCount: {
              type: 'number',
              description: 'How many results to show (default: 10)',
              default: 10
            }
          },
          required: ['query']
        }
      },
      duckDuckGoSearch: {
        handler: this.duckDuckGoSearch.bind(this),
        description: 'Searches with the DuckDuckGo search engine',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Arama sorgusu'
            },
            resultCount: {
              type: 'number',
              description: 'How many results to show (default: 10)',
              default: 10
            }
          },
          required: ['query']
        }
      }
    };
  }
}

module.exports = SearchPlugin;
