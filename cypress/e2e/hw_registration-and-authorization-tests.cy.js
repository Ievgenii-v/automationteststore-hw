import { faker } from '@faker-js/faker';

describe.only('registration-and-authorization-tests', () => {
	it('registration and re-login', () => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const telephone = faker.phone.number();
		const email = faker.internet.email({
			firstName: firstName,
			lastName: lastName,
			provider: 'hello.ua',
		});
		const address1 = faker.location.streetAddress(false);
		const city = faker.location.city();
		const zipCode = faker.location.zipCode();
		const loginName = faker.internet.displayName({
			firstName: firstName,
			lastName: lastName,
		});
		const password = 'TestPassword';
		cy.log(
			`=== Data used in TEST === 
            | FIRSTNAME: ${firstName} |
            | LASTNAME: ${lastName}   |
            | PHONE: ${telephone}     |
            | EMAIL: ${email}         |
            | ADDRESS1: ${address1}   |
            | CITY: ${city}           |
            | ZIP_CODE: ${zipCode}    |
            | LOGIN: ${loginName}     |
            | PASS: ${password}       |`
		);

		cy.visit('https://automationteststore.com/');

		cy.get('#customer_menu_top').click();
		cy.get('button[title="Continue"]').click();

		cy.get('#AccountFrm_firstname').type(firstName);
		cy.get('#AccountFrm_lastname').type(lastName);
		cy.get('#AccountFrm_email').type(email);
		cy.get('#AccountFrm_address_1').type(address1);
		cy.get('#AccountFrm_city').type(city);
		cy.get('#AccountFrm_zone_id').select('3521');
		cy.get('#AccountFrm_postcode').type(zipCode);
		cy.get('#AccountFrm_loginname').type(loginName);
		cy.get('#AccountFrm_password').type(password);
		cy.get('#AccountFrm_confirm').type(password);
		cy.get('#AccountFrm_agree').check('1');
		cy.get('button[title="Continue"]').click();

		cy.get('span[class="maintext"]').should(
			'contain',
			' Your Account Has Been Created!'
		);

		cy.get('ul[class="side_account_list"]')
			.children('li')
			.last()
			.should('contain', 'Logoff')
			.click();

		cy.get('span[class="maintext"]').should('contain', ' Account Logout');
		cy.get('#customernav').contains('Login or register').click();

		cy.get('#loginFrm_loginname').type(loginName);
		cy.get('#loginFrm_password').type(password);
		cy.get('button[title="Login"]').click();

		cy.get('span[class="maintext"]').contains(' My Account');
		cy.get('span[class="subtext"]').should('contain', firstName);
	});
	it.skip('Validating the required fields on the registration form', () => {
		cy.visit('https://automationteststore.com/');

		cy.get('#customer_menu_top').click();
		cy.get('button[title="Continue"]').click();
		cy.get('button[title="Continue"]').click();

		cy.get('#inputEmail').should('have.attr', 'placeholder', 'Email');
		// cy.get('#AccountFrm_firstname').should('')
		// cy.get('#AccountFrm_lastname').
		// cy.get('#AccountFrm_email').
		// cy.get('#AccountFrm_address_1').
		// cy.get('#AccountFrm_city').
		// cy.get('#AccountFrm_zone_id').
		// cy.get('#AccountFrm_postcode').
		// cy.get('#AccountFrm_loginname').
		// cy.get('#AccountFrm_password').
		// cy.get('#AccountFrm_confirm').
		// cy.get('#AccountFrm_agree').
	});
});
