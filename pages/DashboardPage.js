class DashboardPage {
    constructor(page) {
      this.page = page;
      this.welcomeText = '#welcome';
    }
  
    async getWelcomeText() {
      return await this.page.textContent(this.welcomeText);
    }
  }
  
  module.exports = DashboardPage;