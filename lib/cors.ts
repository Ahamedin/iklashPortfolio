import {
  NextRequest,
  NextResponse,
} from "next/server";

// Get Allowed Origins
function getAllowedOrigins(): string[] {

  const defaultOrigins = [
    "https://iklashahamed.dev",
    "https://www.iklashahamed.dev",
    "https://iklash-portfolio.vercel.app",
    "https://www.iklash-portfolio.vercel.app",
    "https://iklashahamed.vercel.app",
    "https://www.iklashahamed.vercel.app",
    "http://localhost:3000",
  ];

  if (
    process.env.ALLOWED_ORIGINS
  ) {

    const envOrigins =
      process.env.ALLOWED_ORIGINS
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);

    return Array.from(
      new Set([
        ...defaultOrigins,
        ...envOrigins,
      ])
    );
  }

  return defaultOrigins;
}

// Validate Origin
export function isAllowedOrigin(
  origin: string | null
): boolean {

  const allowedOrigins =
    getAllowedOrigins();

  return (
    !!origin &&
    allowedOrigins.includes(
      origin
    )
  );
}

// Environment Check
const isDevelopment =
  process.env.NODE_ENV ===
  "development";

// Handle OPTIONS / Preflight Requests
export function corsMiddleware(
  req: NextRequest
) {

  const origin =
    req.headers.get(
      "origin"
    ) || "";

  // Development Mode
  if (isDevelopment) {

    return NextResponse.json(
      {
        success: true,
        message:
          "CORS check passed (development mode)",
      },

      {
        status: 200,

        headers: {
          "Access-Control-Allow-Origin":
            origin,

          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, OPTIONS",

          "Access-Control-Allow-Headers":
            "Content-Type, Authorization",

          "Access-Control-Allow-Credentials":
            "true",
        },
      }
    );
  }

  // Production Validation
  if (
    !isAllowedOrigin(origin)
  ) {

    return NextResponse.json(
      {
        error:
          "Not allowed by CORS",
      },

      {
        status: 403,

        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  }

  return NextResponse.json(
    {
      success: true,
    },

    {
      status: 200,

      headers: {
        "Access-Control-Allow-Origin":
          origin,

        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, OPTIONS",

        "Access-Control-Allow-Headers":
          "Content-Type, Authorization",

        "Access-Control-Allow-Credentials":
          "true",
      },
    }
  );
}

// Apply CORS Wrapper
export function applyCors(
  req: NextRequest,

  handler: (
    req: NextRequest
  ) => Promise<NextResponse>
) {

  // Handle Preflight
  if (
    req.method ===
    "OPTIONS"
  ) {

    return corsMiddleware(
      req
    );
  }

  const origin =
    req.headers.get(
      "origin"
    ) || "";

  // Development Mode
  if (isDevelopment) {
    return handler(req);
  }

  // Validate Origin
  if (
    !isAllowedOrigin(origin)
  ) {

    return NextResponse.json(
      {
        error:
          "Not allowed by CORS",
      },

      {
        status: 403,
      }
    );
  }

  // Execute Handler
  return handler(req).then(
    (response) => {

      response.headers.set(
        "Access-Control-Allow-Origin",
        origin
      );

      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );

      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      response.headers.set(
        "Access-Control-Allow-Credentials",
        "true"
      );

      return response;
    }
  );
}