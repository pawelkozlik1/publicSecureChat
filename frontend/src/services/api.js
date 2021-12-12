export default class ApiService {

    async http(url, params) {
        const response = await fetch(url, { ...params });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Użytkownik nie istnieje');
            } else if (response.status === 403) {
                throw new Error('Użytkownik bez sesji');
            } else if (response.status === 401) {
                throw new Error('Nieprawidłowa nazwa lub hasło');
            } else {
                throw new Error('Inny problem');
            }
        }
        return response.json();
    }

    async get(url) {
        return this.http(url, {
            method: 'GET',
        });
    }

    async post(url, body) {
        return this.http(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            ...(body !== undefined && { body: JSON.stringify(body) }),
        });
    }

    async put(url, body) {
        return this.http(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }

    async delete(url, body) {
        return this.http(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }
}
