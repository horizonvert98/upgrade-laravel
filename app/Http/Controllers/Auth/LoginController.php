<?php

namespace App\Http\Controllers\Auth;

use Mail;
use App\Models\User;
use Validator;
use Illuminate\Http\Request;
use App\Models\AdminSettings;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
	/*
	|--------------------------------------------------------------------------
	| Login Controller
	|--------------------------------------------------------------------------
	|
	| This controller handles authenticating users for the application and
	| redirecting them to your home screen. The controller uses a trait
	| to conveniently provide its functionality to your applications.
	|
	*/
	
	use AuthenticatesUsers;
	
	/**
	 * Where to redirect users after login / registration.
	 *
	 * @var string
	 */
	protected $redirectTo = '/';
	
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct(Guard $auth)
	{
		$this->auth = $auth;
		$this->middleware('guest', ['except' => 'logout']);
	}
	
	public function showLoginForm()
	{	$settings    = AdminSettings::first();
		if (!session()->has('url.intended')) {
			session(['url.intended' => url()->previous()]);
		}
		// if ($settings->registration_active == 0 && $_SERVER["HTTP_X_REAL_IP"]!= '47.15.2.81'){
		// 	return redirect('/');
		// }

		$title = 'Login - ' . $settings->sitename;
        $description = 'Login - ' . $settings->sitename;
        $keywords = 'login, sign in,';
        $thumbimage = url('/').'/public/img/apple/android-chrome-512x512.png';
        $sitemap = '';
        $contenturl = url('/login');
        $rssfeed = '';
		return view('auth.login',compact(['title', 'description', 'keywords','thumbimage','rssfeed','contenturl','sitemap']));
	}
	
	
	public function login(Request $request)
	{
		// get our login input
		$login = $request->input('email');
		
		// check login field
		$login_type = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
		
		// merge our login field into the request with either email or username as key
		$request->merge([$login_type => $login]);
		
		// let's validate and set our credentials
		if ($login_type == 'email') {
			
			$this->validate($request, [
				'email' => 'required|email',
				'password' => 'required',
			]);
			
			$credentials = $request->only('email', 'password');
			
		} else {
			
			$this->validate($request, [
				'email' => 'required',
				'password' => 'required',
			]);
			
			$credentials = $request->only('username', 'password');
			
		}
		
		
		if ($this->auth->attempt($credentials, $request->has('remember'))) {
			
			if ($this->auth->User()->status == 'active') {

				return redirect()->intended('/');
				
			} else if ($this->auth->User()->status == 'suspended') {
				
				$this->auth->logout();
				
				return redirect()->back()
					->withErrors([
						'status' => trans('validation.user_suspended'),
					]);
			} else if ($this->auth->User()->status == 'pending') {
				
				$this->auth->logout();
				
				return redirect()->back()
					->withErrors([
						'status' => trans('validation.account_not_confirmed'),
					]);
			}
			
		}
		
		return redirect()->back()
			->withInput($request->only('email', 'remember'))
			->withErrors([
				'email' => $this->getFailedLoginMessage(),
			]);
	}
	
	/**
	 * Get the failed login message.
	 *
	 * @return string
	 */
	protected function getFailedLoginMessage()
	{
		return trans('auth.error_logging');
	}
	
}
