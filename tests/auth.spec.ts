import { describe, test, expect, jest } from '@jest/globals';
import { AuthService } from '../src/services';
import { AuthRepository } from '../src/database';
import { HTTPError } from '../src/utils';
import { User } from '../src/models';

describe("Testes unitários para o método login do auth service", () => {

  test("Deve retornar 401 caso o usuário não seja encontrado", async () => {
    const authRepository = new AuthRepository();
    const sut = new AuthService(authRepository);

    jest.spyOn(AuthService.prototype, "loginService").mockRejectedValue(
      new HTTPError(401, "E-mail ou senha inválidos")
    );

    const result = sut.loginService({
      email: "naoexiste@email.com",
      password: "senha_errada"
    });

    await expect(result).rejects.toThrow("E-mail ou senha inválidos");
    await expect(result).rejects.toHaveProperty("statusCode", 401);
    await expect(result).rejects.toBeInstanceOf(HTTPError);
  });

  test("Deve retornar 401 caso a senha estiver incorreta", async () => {
    const authRepository = new AuthRepository();
    const sut = new AuthService(authRepository);

    jest.spyOn(AuthService.prototype, "loginService").mockRejectedValue(
      new HTTPError(401, "E-mail ou senha inválidos")
    );

    const result = sut.loginService({
      email: "fabricio@email.com",
      password: "senha_errada"
    });

    await expect(result).rejects.toThrow("E-mail ou senha inválidos");
    await expect(result).rejects.toHaveProperty("statusCode", 401);
    await expect(result).rejects.toBeInstanceOf(HTTPError);
  });

  test("Deve retornar erro caso as variáveis de ambiente JWT não estejam configuradas", async () => {
    const authRepository = new AuthRepository();
    const sut = new AuthService(authRepository);

    jest.spyOn(AuthService.prototype, "loginService").mockRejectedValue(
      new Error("As variáveis de ambiente JWT_SECRET e JWT_EXPIRES_IN devem estar configuradas.")
    );

    const result = sut.loginService({
      email: "fabricio@email.com",
      password: "senha123"
    });

    await expect(result).rejects.toThrow("As variáveis de ambiente JWT_SECRET e JWT_EXPIRES_IN devem estar configuradas.");
  });

  test("Deve retornar token e usuário quando o login for válido", async () => {
    const authRepository = new AuthRepository();
    const sut = new AuthService(authRepository);

    const fakeUser = new User(
      '550e8400-e29b-41d4-a716-446655440000',
      'Fabrício Silva',
      'fabricio_silva',
      'fabricio@email.com',
      'https://foto.com/fabricio.jpg',
      new Date('2026-05-05'),
      new Date('2026-05-05'),
    );

    jest.spyOn(AuthService.prototype, "loginService").mockResolvedValue({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      user: fakeUser
    });

    const result = await sut.loginService({
      email: "fabricio@email.com",
      password: "senha123"
    });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("user");
    expect(result.token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    expect(result.user).toBeInstanceOf(User);
  });

});