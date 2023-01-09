describe('Navigation', () => {
  it('should navigate to the favorites page', () => {
    cy.visit('/playlist')
    cy.get('a[href*="favorites"]').click()
    cy.url().should('include', '/favorites')
    cy.title().should('eq', 'Favorites')
  })

  it('should navigate to the playlist page', () => {
    cy.visit('/favorites')
    cy.get('a[href*="playlist"]').click()
    cy.url().should('include', '/playlist')
    cy.title().should('eq', 'Playlist')
  })
})