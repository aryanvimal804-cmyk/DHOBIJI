import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="DHOBIJI" className="h-10 w-auto object-contain mix-blend-multiply" />
            <span className="font-bold text-xl text-blue-900 tracking-tight">DHOBIJI</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hidden sm:inline-flex">
                Partner Login
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 shadow-md shadow-blue-200 transition-all hover:shadow-lg hover:-translate-y-0.5">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow pt-24 pb-12">
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-24 lg:pb-32 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/3 translate-y-1/4 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              <span>Premium Laundry Delivered to Your Door</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Fresh clothes, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Zero hassle.</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Schedule a pickup in seconds. We wash, dry, iron, and deliver your clothes back to you fresh and perfectly folded within 24 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg shadow-xl shadow-blue-200/50 transition-all hover:shadow-2xl hover:shadow-blue-300 hover:-translate-y-1 group w-full sm:w-auto">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-2 sm:mt-0 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                No hidden fees
              </div>
            </div>
          </div>

          {/* Hero Image/Mockup area */}
          <div className="flex-1 relative z-10 w-full max-w-lg lg:max-w-none">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500 ease-out bg-white">
              <img 
                src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=1200" 
                alt="Fresh neatly folded laundry" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">24h Turnaround</p>
                    <p className="text-xs text-slate-500">Fastest delivery in town</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">4.9/5</p>
                  <p className="text-xs text-slate-500">★ ★ ★ ★ ★</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-white py-24 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Everything your closet needs</h2>
            <p className="text-slate-500 mb-16 max-w-2xl mx-auto">From everyday wear to delicate fabrics, we handle it all with professional care.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Wash & Fold', icon: '🧺', desc: 'Everyday clothes, machine washed and perfectly folded.' },
                { title: 'Dry Cleaning', icon: '👔', desc: 'Premium care for your suits, dresses, and delicates.' },
                { title: 'Ironing', icon: '✨', desc: 'Crisp, wrinkle-free finishing for shirts and trousers.' },
                { title: 'Shoe Care', icon: '👟', desc: 'Deep cleaning and restoration for your favorite sneakers.' }
              ].map((service, i) => (
                <div key={i} className="group p-8 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 cursor-pointer">
                  <div className="text-5xl mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform">{service.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-16">How it works</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-start gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-blue-100 -z-10"></div>
            
            {[
              { icon: MapPin, title: 'Schedule Pickup', desc: 'Choose a convenient time and location for us to pick up your clothes.' },
              { icon: ShieldCheck, title: 'We Clean', desc: 'Our partners carefully wash, dry, and iron your items.' },
              { icon: Clock, title: 'We Deliver', desc: 'Get your fresh clothes back at your doorstep within 24-48 hours.' }
            ].map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-50 flex items-center justify-center mb-6 shadow-xl shadow-blue-100/50">
                  <step.icon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Ready for a laundry-free life?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg relative z-10">Join thousands of happy customers who have switched to DHOBIGO.</p>
            <Link to="/login" className="relative z-10">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 rounded-full px-8 font-bold shadow-lg">
                Book Your First Pickup
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-2xl text-white tracking-tight">DHOBIGO</span>
            </div>
            <p className="max-w-xs text-sm">Making laundry day completely effortless for you and your family.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Partner With Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
          &copy; {new Date().getFullYear()} DHOBIGO. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
