# HEADLESS INSTAGRAM SCRAPER


This is nodejs tool is for scraping instagram user profile photos using headless browser.


Required inputs:    

    1. INSTAGRAM_PROFILE_URL - instagram profile url which needs to be scraped 
    2. HEADLESS - whether to run in headless mode or not ( defaults to true )
    3. SLOW_MO - headless browser tasks slowed down by n milliseconds 
    4. SCRAPING_ACCOUNT_USERNAME -  instagram profile username which will be used for the scraping
    5. SCRAPING_ACCOUNT_PASSWORD - instagram profile password which will be used for the scraping
    6. OUTPUT_DIR - directory name to store the scraped data


Due to rate limit by the instagram this script requires manual confirmation ( on clicking on the scrren of that tab ) for ending the auto scroll and start downloading the data.