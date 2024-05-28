import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse,NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher(['/site','/api/uploadthing','/agency/sign-in', '/agency/sign-up']);

async function afterAuth(auth:any,request:NextRequest){
  // rewrite for domain
  const url = request.nextUrl
  const searchParams = url.searchParams.toString()
  let hostname = request.headers

  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}`: ''
  }`

  //if subdomain exists
  const customSubDomain = hostname.get('host')
  ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
  .filter(Boolean)[0]

  if(customSubDomain){
    return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams}`))
  }

  if (url.pathname === "/sign-in" || url.pathname === "/sign-up"){
    return NextResponse.redirect(new URL(`/agency/sign-in`,request.url))
  }

  if(url.pathname === "/" || url.pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN){
    return NextResponse.redirect(new URL("/site", request.url))
  }

  if(url.pathname.startsWith('/agency')|| url.pathname.startsWith('/subaccount')){
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`,request.url))
  }

}

export default clerkMiddleware(async(auth, request) => {
  await afterAuth(auth,request)
    if(!isPublicRoute(request)) {
      auth().protect();
      // await afterAuth(auth,request)
    }
    
    
  });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const isProtectedRoute = createRouteMatcher([
//   '/agency(.*)',
//   '/forum(.*)',
// ]);

// export default clerkMiddleware((auth, req) => {
//   if (!auth().userId && isProtectedRoute(req)) {

//     // Add custom logic to run before redirecting

//     return auth().redirectToSignIn();
//   }
// });

// export const config = { matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']};