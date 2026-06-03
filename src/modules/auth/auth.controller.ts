import { Controller, Post, Body } from "@inversifyjs/http-core";
import { inject } from "inversify";
import {
  CreatedHttpResponse,
  ErrorHttpResponse,
  HttpStatusCode,
} from "@inversifyjs/http-core";
import { TYPES } from "../../core/types";
import { AuthProvider } from "./auth.provider";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

@Controller("/auth")
export class AuthController {
  constructor(
    @inject(TYPES.AuthProvider) private readonly authProvider: AuthProvider,
  ) {}

  @Post("/register")
  async register(@Body() body: RegisterBody): Promise<CreatedHttpResponse> {
    const user = await this.authProvider.register(body.name, body.email, body.password);
    return new CreatedHttpResponse(user);
  }

  @Post("/login")
  async login(@Body() body: LoginBody) {
    try {
      const result = await this.authProvider.login(body.email, body.password);
      return result;
    } catch {
      throw new ErrorHttpResponse(
        HttpStatusCode.UNAUTHORIZED,
        { message: "Invalid credentials" },
        "Invalid credentials",
      );
    }
  }
}
